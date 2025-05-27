<?php
/**
 * Copyright (c) 2024
 * @author: Alttantire Yazılım Çözümleri <info@alttantire.com>
 * Web: https://www.alttantire.com
 *
 */

namespace Opencart\Admin\Model\Extension\Alttantire\Payment;
class CreditCard extends \Opencart\System\Engine\Model
{
    public function install(): void
    {

    }

    public function uninstall(): void
    {
        $this->load->model('setting/setting');

        $blank_data = array(
            "payment_credit_card_environment" => "",
            "payment_credit_card_client_id" => "",
            "payment_credit_card_api_user" => "",
            "payment_credit_card_api_pass" => "",
            "payment_credit_card_order_completed_id" => "");

        $this->model_setting_setting->editSetting('payment_credit_card', $blank_data);
    }


}
