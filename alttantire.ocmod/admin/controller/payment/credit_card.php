<?php
/**
 * Copyright (c) 2024
 * @author: Alttantire Yazılım Çözümleri <info@alttantire.com>
 * Web: https://www.alttantire.com
 *
 */

namespace Opencart\Admin\Controller\Extension\Alttantire\Payment;

use Alttantire\Gateway;
use Exception;

date_default_timezone_set("Europe/Istanbul");

if (!defined("ALTTANTIRE_MIN_PHP_VER")) {
    define('ALTTANTIRE_MIN_PHP_VER', '8.1.0');
}

class CreditCard extends \Opencart\System\Engine\Controller
{

    protected $Gateway;
    private $error = array();
    private $success = array();
    private bool $verified = false;
    private bool $has_installment_auth = false;

    public function __construct($registry)
    {

        parent::__construct($registry);

        include DIR_EXTENSION . "alttantire/system/library/payment-sdk/Gateway.php";

        $this->Gateway = new Gateway($this->config->get('payment_credit_card_environment'), $this->config->get('payment_credit_card_client_id'), $this->config->get('payment_credit_card_api_user'), $this->config->get('payment_credit_card_api_pass'));

    }

    public function index(): void
    {

        $this->load->language('extension/alttantire/payment/credit_card');

        $this->document->setTitle($this->language->get('heading_title'));

        $data['breadcrumbs'] = [];

        $data['breadcrumbs'][] = [
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/dashboard', 'user_token=' . $this->session->data['user_token'])
        ];

        $data['breadcrumbs'][] = [
            'text' => $this->language->get('text_extension'),
            'href' => $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=payment')
        ];

        $data['breadcrumbs'][] = [
            'text' => $this->language->get('heading_title'),
            'href' => $this->url->link('extension/alttantire/payment/credit_card', 'user_token=' . $this->session->data['user_token'])
        ];

        $data['save'] = $this->url->link('extension/alttantire/payment/credit_card.save', 'user_token=' . $this->session->data['user_token']);
        $data['back'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=payment');

        /****/

        $data['errors_message'] = array(
            'warning' => $this->language->get('error_warning'),
            'payment_credit_card_client_id' => $this->language->get('error_client_id'),
            'payment_credit_card_api_user' => $this->language->get('error_api_user'),
            'payment_credit_card_api_pass' => $this->language->get('error_api_pass'),
            'payment_credit_card_environment' => $this->language->get('error_environment'),
            'payment_credit_card_order_completed_id' => $this->language->get('error_order_completed_id'),
            'alttantire_merchant_general' => $this->language->get('error_alttantire_merchant_general'),
        );

        if (isset($this->request->post['payment_credit_card_environment'])) {
            $data['payment_credit_card_environment'] = trim($this->request->post['payment_credit_card_environment']);
        } else {
            $data['payment_credit_card_environment'] = $this->config->get('payment_credit_card_environment');
        }

        if (isset($this->request->post['payment_credit_card_client_id'])) {
            $data['payment_credit_card_client_id'] = trim($this->request->post['payment_credit_card_client_id']);
        } else {
            $data['payment_credit_card_client_id'] = $this->config->get('payment_credit_card_client_id');
        }

        if (isset($this->request->post['payment_credit_card_api_user'])) {
            $data['payment_credit_card_api_user'] = trim($this->request->post['payment_credit_card_api_user']);
        } else {
            $data['payment_credit_card_api_user'] = $this->config->get('payment_credit_card_api_user');
        }

        if (isset($this->request->post['payment_credit_card_api_pass'])) {
            $data['payment_credit_card_api_pass'] = trim($this->request->post['payment_credit_card_api_pass']);
        } else {
            $data['payment_credit_card_api_pass'] = $this->config->get('payment_credit_card_api_pass');
        }

        if (isset($this->request->post['payment_credit_card_order_completed_id'])) {
            $data['payment_credit_card_order_completed_id'] = $this->request->post['payment_credit_card_order_completed_id'];
        } else {
            $data['payment_credit_card_order_completed_id'] = $this->config->get('payment_credit_card_order_completed_id');
        }

        $this->load->model('localisation/order_status');

        $data['order_statuses'] = $this->model_localisation_order_status->getOrderStatuses();

        if (!$this->config->get('payment_credit_card_environment') || !$this->config->get('payment_credit_card_client_id') || !$this->config->get('payment_credit_card_api_user') || !$this->config->get('payment_credit_card_api_pass')) {
            $this->error['alttantire_merchant_general'] = "Sanal POS bilgilerinizi girerek kurulumunuzu tamamlayınız.";
        } else {
            try {
                if ($this->check_minimum_requirements()) {
                    $verify_client = $this->Gateway->verifyClient();

                    if (!$verify_client) {
                        throw new Exception("Kurulum bilgileri hatalı");
                    }

                    $this->verified = intval($verify_client->Code) === 0;

                    $this->has_installment_auth = $verify_client->HasInstallmentAuth ?? false;

                    if (!$this->verified) {
                        throw new Exception($verify_client->Message ?? "Hatalı Kurulum!");
                    }

                    $this->success[] = "Sanal POS kurulumu başarılı. Taksit Yetkisi: " . ($this->has_installment_auth ? "Var" : "Yok");

                }

            } catch (Exception $e) {
                $this->error[] = "<strong>" . $e->getMessage() . "</strong> Sanal POS bilgilerinizi kontrol ediniz. Ödeme modülü mevcut ayarlarınızla çalışmayacaktır.";
            }
        }

        $data['errors'] = $this->error;
        $data['success'] = $this->success;

        /****/

        $data['payment_credit_card_status'] = $this->config->get('payment_credit_card_status');
        $data['payment_credit_card_sort_order'] = $this->config->get('payment_credit_card_sort_order');

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/alttantire/payment/credit_card', $data));
    }

    public function save(): void
    {
        $this->load->language('extension/alttantire/payment/credit_card');

        $json = [];

        if (!$this->user->hasPermission('modify', 'extension/alttantire/payment/credit_card')) {
            $json['error'] = $this->language->get('error_permission');
        }

        $this->request->post['payment_credit_card_client_id'] = intval($this->request->post['payment_credit_card_client_id']);

        $validate = $this->validate();

        if ($validate !== true) {
            $json['error'] = $validate;
        }

        if (!$json && $validate === true) {

            $this->load->model('setting/setting');

            $this->model_setting_setting->editSetting('payment_credit_card', $this->request->post);

            $json['success'] = $this->language->get('text_success');
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
    }

    protected function validate(): bool|string
    {

        if (!$this->request->post['payment_credit_card_environment']) {
            return $this->language->get('error_environment');
        }

        if (!$this->request->post['payment_credit_card_client_id']) {
            return $this->language->get('error_client_id');
        }

        if (!$this->request->post['payment_credit_card_api_user']) {
            return $this->language->get('error_api_user');
        }

        if (!$this->request->post['payment_credit_card_api_pass']) {
            return $this->language->get('error_api_pass');
        }

        if (!$this->request->post['payment_credit_card_order_completed_id']) {
            return $this->language->get('error_order_completed_id');
        }

        return true;
    }

    public function install(): void
    {
        if ($this->user->hasPermission('modify', 'extension/payment')) {
            $this->load->model('extension/alttantire/payment/credit_card');

            $this->model_extension_alttantire_payment_credit_card->install();
        }
    }

    public function uninstall(): void
    {
        if ($this->user->hasPermission('modify', 'extension/payment')) {
            $this->load->model('extension/alttantire/payment/credit_card');

            $this->model_extension_alttantire_payment_credit_card->uninstall();
        }
    }

    function check_minimum_requirements()
    {

        if (version_compare(phpversion(), ALTTANTIRE_MIN_PHP_VER, '<')) {
            $this->error[] = "Web sitenizde PHP " . phpversion() . " Versiyonunu kullanıyorsunuz. Tosla İşim Sanal POS eklentisi, PHP " . ALTTANTIRE_MIN_PHP_VER . " ve üzeri versiyonda çalışır.";
            return false;
        }

        if (!function_exists('curl_init') && !function_exists('file_get_contents') && !ini_get('allow_url_fopen')) {
            $this->error[] = "Sunucunuzda cURL kurulu ya da aktif değil. Tosla İşim Sanal POS'u kullanabilmeniz için sunucunuzda cURL kurulu olmalıdır.";
            return false;
        }

        return true;

    }


}
