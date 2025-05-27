<?php
namespace Opencart\Catalog\Model\Extension\Alttantire\Payment;
class CreditCard extends \Opencart\System\Engine\Model {
	public function getMethods(array $address): array {
		$this->load->language('extension/alttantire/payment/credit_card');

		if (!$this->config->get('config_checkout_payment_address')) {
			$status = true;
		} elseif (!$this->config->get('payment_credit_card_geo_zone_id')) {
			$status = true;
		} else {
			$query = $this->db->query("SELECT * FROM `" . DB_PREFIX . "zone_to_geo_zone` WHERE `geo_zone_id` = '" . (int)$this->config->get('payment_credit_card_geo_zone_id') . "' AND `country_id` = '" . (int)$address['country_id'] . "' AND (`zone_id` = '" . (int)$address['zone_id'] . "' OR `zone_id` = '0')");

			if ($query->num_rows) {
				$status = true;
			} else {
				$status = false;
			}
		}

		$method_data = [];

		if ($status) {
			$option_data = [];

			$option_data['credit_card'] = [
				'code' => 'credit_card.credit_card',
				'name' => $this->language->get('text_card_use')
			];


			$method_data = [
				'code'       => 'credit_card',
				'name'       => $this->language->get('heading_title'),
				'option'     => $option_data,
				'sort_order' => $this->config->get('payment_credit_card_sort_order')
			];
		}

		return $method_data;
	}

    public function updateOrderTotal($order_id, $order_total, $fee){

        $this->db->query("INSERT INTO " . DB_PREFIX . "order_total SET order_id = '" . $this->db->escape($order_id) . "', code = 'commission_fee', title = 'Vade Farkı', `value` = '" . $this->db->escape($fee) . "', sort_order = '7'");
        $this->db->query("UPDATE " . DB_PREFIX . "order_total SET `value` = '" . $this->db->escape($order_total) . "' WHERE order_id = '" . $this->db->escape($order_id) . "' AND code = 'total'");
        $this->db->query("UPDATE " . DB_PREFIX . "order SET `total` = '" . $this->db->escape($order_total) . "' WHERE order_id = '" . $this->db->escape($order_id) . "' ");

    }
}
