<?php

namespace Opencart\Catalog\Controller\Extension\Alttantire\Payment;

date_default_timezone_set("Europe/Istanbul");

use Alttantire\Gateway;
use Alttantire\CookieSetter;

class CreditCard extends \Opencart\System\Engine\Controller
{

    protected object $Gateway;
    protected int $installment;
    protected string $threed_session_id;
    protected string $payment_url;
    protected bool $has_installment_auth;

    protected array $card = [];

    public function __construct($registry)
    {
        parent::__construct($registry);

        include DIR_EXTENSION . "alttantire/system/library/payment-sdk/Gateway.php";
        include DIR_EXTENSION . "alttantire/system/library/payment-sdk/CookieSetter.php";

        $this->Gateway = new Gateway($this->config->get('payment_credit_card_environment'), $this->config->get('payment_credit_card_client_id'), $this->config->get('payment_credit_card_api_user'), $this->config->get('payment_credit_card_api_pass'));

    }

    public function index(): string
    {
        $this->load->language('extension/alttantire/payment/credit_card');

        if (isset($this->session->data['payment_method'])) {

            $this->set_same_site_policy();

            try {
                $verify_client = $this->Gateway->verifyClient();
                $this->has_installment_auth = $verify_client->HasInstallmentAuth ?? false;
                $data["verified"] = $verify_client->Code == 0;
                $data["has_installment_auth"] = $this->has_installment_auth;

            } catch (Exception $e) {
                $data["verified"] = false;
                $data["has_installment_auth"] = false;
            }

            $data['formUrl'] = $this->Gateway->getFormUrl();
            $data["paymentData"] = $this->prepare_payment_form_data();
            $data["expire"] = $this->get_dropdown_fields();

            $data['language'] = $this->config->get('config_language');

            $data['months'] = [];

            foreach (range(1, 12) as $month) {
                $data['months'][] = date('m', mktime(0, 0, 0, $month, 1));
            }

            $data['years'] = [];

            foreach (range(date('Y'), date('Y', strtotime('+10 year'))) as $year) {
                $data['years'][] = $year;
            }

            return $this->load->view('extension/alttantire/payment/credit_card', $data);

        }

        return '';
    }

    public function prepare_payment_form_data()
    {
        if (!isset($_SERVER['HTTP_REFERER'])) {
            die('NOT FOUND');
        }

        $this->load->model('checkout/order');
        $this->load->language('extension/payment/alttantire');

        $order_info = $this->model_checkout_order->getOrder($this->session->data['order_id']);

        if ($order_info) {

            if ($order_info['order_status_id'] == 0) {

                if ($order_info['total'] == 0) {
                    die($this->language->get('error_invalid_amount'));
                }
            } else {
                die($this->session->data['order_id'] . " " . $this->language->get('error_order_already_paid') . " " . $order_info['order_status_id']);
            }

        } else {
            die($this->language->get('error_order_not_found'));
        }

        $data = array();

        $data['user_ip'] = $this->getIP();
        $data['total'] = $order_info['total'];
        $data['payment_amount'] = ($this->currency->format($order_info['total'], $order_info['currency_code'], $order_info['currency_value'], true));

        return $data;

    }

    function commission_fee()
    {
        $installment = filter_input(INPUT_POST, 'installment', FILTER_SANITIZE_SPECIAL_CHARS);
        $extra_fee = filter_input(INPUT_POST, 'extra_fee', FILTER_SANITIZE_SPECIAL_CHARS);

        if (intval($installment) > 1) {
            setcookie('gtw_tmp', json_encode(["installment" => $installment, "extra_fee" => $extra_fee ? $extra_fee : 0]), time() + 62208000, '/');
        } else {
            unset($_COOKIE["gtw_tmp"]);
            setcookie("gtw_tmp", '', time() - (15 * 60));
        }

        exit;
    }


    public function getIP()
    {

        if (isset($_SERVER["HTTP_CLIENT_IP"])) {

            $ip = $_SERVER["HTTP_CLIENT_IP"];

        } elseif (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {

            $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];

        } else {

            $ip = $_SERVER["REMOTE_ADDR"];

        }

        return $ip;
    }

    function get_dropdown_fields(): array
    {

        $month = "<select class=\"alttantire-form-select my-1\" id=\"card-expiry-month\" name=\"card-expiry-month\">";
        $month .= "<option disabled selected value>AA</option>";

        for ($i = 1; $i < 13; $i++) {
            $month .= '<option value="' . str_pad($i, 2, '0', STR_PAD_LEFT) . '">' . str_pad($i, 2, '0', STR_PAD_LEFT)
                . '</option>';
        }

        $month .= "</select>";

        $year = "<select class=\"alttantire-form-select my-1\" id=\"card-expiry-year\" name=\"card-expiry-year\">";
        $year .= "<option disabled selected value>YY</option>";

        for ($i = date("y"); $i < date("y") + 10; $i++) {
            $year .= '<option value="' . str_pad($i, 2, '0', STR_PAD_LEFT) . '">' . str_pad($i, 2, '0', STR_PAD_LEFT)
                . '</option>';
        }

        $year .= "</select>";

        return ["month" => $month, "year" => $year];

    }

    public function get_site_url()
    {
        if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) {
            $siteUrl = str_replace("http://", "https://", HTTP_SERVER);
        } else {
            $siteUrl = HTTP_SERVER;
        }

        return $siteUrl;
    }

    private function set_same_site_policy()
    {

        $path = ini_get('session.cookie_path');
        $domain = $this->request->server['HTTP_HOST'];
        foreach ($_COOKIE as $k => $v) {
            CookieSetter::setcookie($k, $v, array('secure' => true, 'samesite' => 'None', 'path' => $path, 'domain' => $domain));
        }
    }


    public function process_payment()
    {
        if (!isset($_SERVER['HTTP_REFERER'])) {
            die('NOT FOUND');
        }
        $this->load->language('extension/payment/alttantire');

        $this->set_same_site_policy();
        $resp = $this->get_threed_form();

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($resp));

    }

    public function installment()
    {

        unset($_COOKIE["gtw_tmp"]);
        setcookie("gtw_tmp", '', time() - (15 * 60));

        $verify_client = $this->Gateway->verifyClient();
        $this->has_installment_auth = isset($verify_client->HasInstallmentAuth) ? $verify_client->HasInstallmentAuth : false;

        $bin = filter_input(INPUT_POST, 'bin', FILTER_SANITIZE_SPECIAL_CHARS);
        $installment_options = ($this->has_installment_auth) ? $this->Gateway->getCommissionAndInstallmentInfo($bin) : null;

        echo json_encode($installment_options);
        exit;
    }

    public function get_threed_form()
    {

        if (!isset($_SERVER['HTTP_REFERER'])) {
            die('NOT FOUND');
        }

        $this->load->model('checkout/order');

        $order_info = $this->model_checkout_order->getOrder($this->session->data['order_id']);

        $installment = filter_input(INPUT_POST, 'installment', FILTER_SANITIZE_SPECIAL_CHARS);
        $this->installment = $installment ? $installment : 1;
        $this->installment = intval($this->installment);

        $card_expiry_month = filter_input(INPUT_POST, 'card-expiry-month', FILTER_SANITIZE_SPECIAL_CHARS);
        $card_expiry_year = filter_input(INPUT_POST, 'card-expiry-year', FILTER_SANITIZE_SPECIAL_CHARS);

        $extra_fee = 0;
        if (isset($_COOKIE['gtw_tmp'])) {
            $tmp = json_decode(stripcslashes((string)$_COOKIE['gtw_tmp']));
            $extra_fee = $tmp->extra_fee ?? 0;
        }
        unset($_COOKIE["gtw_tmp"]);
        setcookie("gtw_tmp", '', time() - (15 * 60));

        $payment_amount = ($order_info['total'] + $extra_fee) * 100;

        $returnUrl = $this->get_site_url() . "index.php?route=extension/alttantire/payment/credit_card.callback&language=" . $this->config->get('config_language');

        try {
            $this->payment_url = $this->Gateway->getFormUrl();

            $gtw_order_id = $order_info['order_id'] . "_ALT_" . rand(999, 99999);

            $result = $this->Gateway->threeDPayment($returnUrl, $payment_amount, $this->installment, $gtw_order_id);

        } catch (Exception $e) {

            return [
                'result' => false,
                'messages' => $e->getMessage(),
            ];
        }

        if (isset($result->ThreeDSessionId)) {

            $this->threed_session_id = $result->ThreeDSessionId;

            $this->card = [
                'owner_name' => $_POST['CardHolderName'],
                'number' => preg_replace("/\s+/", "", $_POST['CardNo']),
                'expire_month' => $card_expiry_month,
                'expire_year' => $card_expiry_year,
                'expire_date' => $card_expiry_month . "" . $card_expiry_year,
                'cvc' => preg_replace("/\s+/", "", $_POST['Cvv'])
            ];

            $threeDhtml = $this->pay_threed();

            return [
                'result' => true,
                'messages' => "$threeDhtml",
            ];

        } else {
            $responseTxt = "";
            foreach ($result as $key => $value) {
                if (is_array($value)) {
                    $responseTxt .= $key . " " . (implode(" ", $value)) . "\n";

                } else {
                    $responseTxt .= $key . " " . $value . "\n";

                }
            }

            return [
                'result' => false,
                'messages' => "$responseTxt",
            ];

        }

    }

    public function pay_threed()
    {

        $form = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">";
        $form .= "<html>";
        $form .= "<body>";
        $form .= "<form action=\"" . $this->payment_url . "\" method=\"post\" id=\"threed_form\"/>";

        $form .= "<input type=\"hidden\" name=\"ThreeDSessionId\" value=\"" . $this->threed_session_id . "\"/>";

        $form .= "<input type=\"hidden\" name=\"CardHolderName\" value=\"" . $this->card['owner_name'] . "\"/>";

        $form .= "<input type=\"hidden\" name=\"CardNo\" value=\"" . $this->card['number'] . "\"/>";

        $form .= "<input type=\"hidden\" name=\"Cvv\" value=\"" . $this->card['cvc'] . "\"/>";

        $form .= "<input type=\"hidden\" name=\"ExpireDate\" value=\"" . $this->card['expire_date'] . "\"/>";

        $form .= "<input type=\"hidden\" name=\"installment\" value=\"" . $this->installment . "\"/>";

        $form .= "<input type=\"submit\" value=\"Öde\" style=\"display:none;\"/>";
        $form .= "<noscript>";
        $form .= "<br/>";
        $form .= "<br/>";
        $form .= "<center>";
        $form .= "<h1>3D Secure Yönlendirme İşlemi</h1>";
        $form .= "<h2>Javascript internet tarayıcınızda kapatılmış veya desteklenmiyor.<br/></h2>";
        $form .= "<h3>Lütfen banka 3D Secure sayfasına yönlenmek için tıklayınız.</h3>";
        $form .= "<input type=\"submit\" value=\"3D Secure Sayfasına Yönlen\">";
        $form .= "</center>";
        $form .= "</noscript>";
        $form .= "</form>";
        $form .= "</body>";
        $form .= "<script>document.getElementById(\"threed_form\").submit();</script>";
        $form .= "</html>";

        return $form;
    }

    public function callback()
    {

        $this->Gateway->setPost($_POST);

        if ($this->Gateway->isSuccessfull()) {

            $api_order_id = ($_POST['OrderId']);

            if (isset($this->session->data['order_id'])) {
                $order_id = $this->session->data['order_id'];
            } else {
                $order_id = intval(explode("_ALT_", $api_order_id)[0]);
            }

            $paymentCheck = $this->Gateway->inquiry($api_order_id);

            if ($paymentCheck->BankResponseCode == "00") {

                $this->load->model('checkout/order');

                $order_info = $this->model_checkout_order->getOrder($order_id);

                $notes[] = "Banka Cevabı: " . $paymentCheck->BankResponseMessage ?? "Başarılı";
                $notes[] = "Ödenen Tutar: " . ($paymentCheck->Amount / 100) . " TL";
                $notes[] = "Taksit: " . ($paymentCheck->InstallmentCount > 0 ? $paymentCheck->InstallmentCount : "Yok");
                $notes[] = "Vade Farkı: " . (($paymentCheck->Amount / 100) - $order_info['total']) . " TL";

                $this->model_checkout_order->addHistory(
                    $order_id,
                    $this->config->get('payment_credit_card_order_completed_id'),
                    implode("<br/>", $notes),
                    true);

                $this->load->model('extension/alttantire/payment/credit_card');

                $this->model_extension_alttantire_payment_credit_card->updateOrderTotal($order_id, ($paymentCheck->Amount / 100), (($paymentCheck->Amount / 100) - $order_info['total']));
                $this->response->redirect($this->url->link('checkout/success', '', true));

            }

        } else {
            $err_message = $_POST["BankResponseCode"] . " - " . $_POST["BankResponseMessage"];

            $this->session->data['error'] = $err_message;

            $this->response->redirect($this->url->link('checkout/failure', 'language=' . $this->config->get('config_language'), true));
        }

    }


}
