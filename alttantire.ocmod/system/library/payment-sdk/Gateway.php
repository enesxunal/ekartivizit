<?php
/**
 * Copyright (c) 2024
 * @author: Alttantire Yazılım Çözümleri <info@alttantire.com>
 * Web: https://www.alttantire.com
 *
 */

namespace Alttantire;
use Exception;

class Gateway {

    const DEFAULT_CURRENCY = 949;
    protected $clientId;
    protected $apiUser;
    protected $apiPass;
    protected $rnd;
    protected $timeSpan;
    protected $httpClient;
    protected $container;
    protected $url = "";
    protected $postdata = []; //default
    private $communication_method = "cURL";

    public function __construct( $apiUrl, $clientId, $apiUser, $apiPass ) {
        $this->clientId = $clientId;
        $this->apiUser  = $apiUser;
        $this->apiPass  = $apiPass;
        $this->url      = $apiUrl;

        if ( ! $this->endsWith( $this->url, "/" ) ) {
            $this->url = $this->url . "/";
        }

        $this->init();
    }

    public function init() {
        $this->newRandomString();
        $this->newTimeSpan();
        $this->detectCommunicationMethod();

        return $this;
    }

    function endsWith( $haystack, $needle, $case = true ) {
        if ( $case ) {
            return ( strcmp( substr( $haystack, strlen( $haystack ) - strlen( $needle ) ), $needle ) === 0 );
        }

        return ( strcasecmp( substr( $haystack, strlen( $haystack ) - strlen( $needle ) ), $needle ) === 0 );
    }

    public function newRandomString( $length = 12 ) {
        return $this->rnd = rand( 1, 10000 ); //substr(sha1(rand()), 0, $length);
    }

    public function newTimeSpan( $date = null ) {
        return $this->timeSpan = date( "YmdHis", $date ?: time() );
    }

    /**
     * @param        $callbackUrl //3D işlemi için geri dönüş URL si
     * @param        $amount //tutarı 100 ile çarparak gönderin, 1TL için 100 gönderilmeli
     * @param int $installment //Taksit
     * @param string $orderId
     * @param int $currency
     *
     * @return mixed
     */
    public function threeDPayment( $callbackUrl, $amount, $installment = 0, $orderId = "", $currency = 949 ) {
        return $this->post( "threeDPayment", $this->params( [
            'callbackUrl'      => $callbackUrl,
            'orderId'          => $orderId,
            'amount'           => $amount,
            'currency'         => $currency,
            'installmentCount' => $installment,
        ] ) );
    }

    /**
     * @throws Exception
     */
    public function verifyClient() {
        return $this->post( "VerifyClient", $this->params( [
        ] ) );
    }


    public function getCommissionAndInstallmentInfo( $bin ) {
        return $this->post( "GetCommissionAndInstallmentInfo", $this->params( [
            'bin' => $bin,
        ] ) );
    }

    public function detectCommunicationMethod() {

        if ( function_exists( 'curl_init' ) ) {
            $this->communication_method = "cURL";

            return;
        }

        if ( function_exists( 'file_get_contents' ) && ini_get( 'allow_url_fopen' ) ) {
            $this->communication_method = "fopen";

            return;
        }
    }

    public function post( $url, $postdata = [] ) {


        switch ( $this->communication_method ) {

            case "cURL":
                return $this->post_with_curl( $url, $postdata );
                break;

            case "fopen":
                return $this->post_with_file_contents( $url, $postdata );
                break;

            default:
                return false;
        }
    }

    /**
     * @throws Exception
     */
    public function post_with_file_contents( $url, $postdata = [] ) {

        try {
            return $this->file_contents( $this->url . $url, $postdata );
        } catch ( Exception $e ) {
            throw new Exception( $e->getMessage() );
        }

    }

    function file_contents( $path, $postdata = [] ) {
        $data_string = json_encode( $postdata );

        $opts    = array(
            'http' =>
                array(
                    'method'  => 'POST',
                    'header'  => 'Content-type:application/json',
                    'timeout' => 10,
                    'content' => $data_string
                )
        );

        $context = stream_context_create( $opts );

        if ( ! $str = file_get_contents( $path, false, $context ) ) {
            throw new Exception( "Cannot access '$path' to read contents." );
        } else {
            return json_decode( (string) $str );
        }
    }

    /**
     * @throws Exception
     */
    public function post_with_curl( $url, $postdata = [] ) {

        try {
            $data_string = json_encode( $postdata );

            $ch = @curl_init( $this->url . $url );

            @curl_setopt( $ch, CURLOPT_POST, true );
            @curl_setopt( $ch, CURLOPT_POSTFIELDS, $data_string );
            @curl_setopt( $ch, CURLOPT_HTTPHEADER, array( 'Content-Type:application/json' ) );
            @curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
            @curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
            @curl_setopt($ch, CURLOPT_TIMEOUT, 10); //timeout in seconds

            $result = @curl_exec( $ch );

            if ( @curl_errno( $ch ) ) {
                $error_msg = curl_error( $ch );
                @curl_close( $ch );
                throw new Exception( $error_msg );
            } else {
                $data = json_decode( $result );
                @curl_close( $ch );

                return $data;

            }

        } catch ( Exception $e ) {

            return false;

            throw new Exception( $e->getMessage(), 0, $e );
        }

    }



    /*   public function post($url, $postdata = [])
       {
           return $this->call(function () use ($url, $postdata) {
               return $this->httpClient()->request('POST', $url, [
                   'json' => $postdata
               ]);
           });
       }*/

    /*    public function call($callable)
            {
                try {
                    $response = $callable();

                    $responseBody = (string)$response->getBody();

                    $result = json_decode($responseBody);

                    return $result;
                } catch (BadResponseException $e) {
                    $body = "";
                    foreach ($this->container as $transaction) {
        //                $body .= (string)$transaction['request']->getBody();
                    }

                    throw new Exception($e->getMessage() . "\n{$body}", 0, $e);
                }
    }*/

    public function httpClient() {
        $this->container = [];

        $history = Middleware::history( $this->container );

        $stack = HandlerStack::create();
        // Add the history middleware to the handler stack.
        $stack->push( $history );

        return $this->httpClient ?: $this->httpClient = new Client( [
            'base_uri' => "{$this->url}",
            'debug'    => false,
            'handler'  => $stack,
            'headers'  => [
                'Accept' => 'application/json',
            ]
        ] );
    }

    public function params( $params = [] ) {
        return [
                'clientId' => $this->clientId,
                'apiUser'  => $this->apiUser,
                'Rnd'      => $this->rnd ?: $this->newRandomString(),
                'timeSpan' => $this->timeSpan ?: $this->newTimeSpan(),
                'Hash'     => $this->generateHash(),
            ] + $params;
    }

    public function generateHash() {
        $apiPass  = $this->apiPass;
        $clientId = $this->clientId;
        $apiUser  = $this->apiUser;
        $rnd      = $this->rnd;
        $timeSpan = $this->timeSpan;

        $hashString = $apiPass . $clientId . $apiUser . $rnd . $timeSpan;

        $hashingbytes = hash( "sha512", ( $hashString ), true );

        $hash = base64_encode( $hashingbytes );

        return $hash;
    }

    public function inquiry( $orderId ) {
        return $this->post( "inquiry", $this->params( compact( 'orderId' ) ) );
    }

    public function void( $orderId ) {
        return $this->post( "void", $this->params( [
            'orderId' => $orderId,
        ] ) );
    }

    public function refund( $amount, $orderId = "" ) {
        return $this->post( "refund", $this->params( [
            'orderId' => $orderId,
            'amount'  => $amount,
        ] ) );
    }

    /**
     * @param     $date //date format: yyyyMMdd date('Ymd')
     * @param int $page
     * @param int $pageSize
     *
     * @return mixed
     */
    public function history( $date, $page = 1, $pageSize = 10 ) {
        return $this->post( "history", $this->params( [
            'reconciliationDate' => $date,
            'Page'               => $page,
            'pageSize'           => $pageSize,
        ] ) );
    }

    public function threeDPreAuth( $callbackUrl, $amount, $orderId = "", $currency = 949 ) {
        return $this->post( "threeDPreAuth", $this->params( [
            'callbackUrl' => $callbackUrl,
            'orderId'     => $orderId,
            'amount'      => $amount,
            'currency'    => $currency,
        ] ) );
    }

    public function postAuth( $amount, $orderId = "" ) {
        return $this->post( "postAuth", $this->params( [
            'orderId' => $orderId,
            'amount'  => $amount,
        ] ) );
    }

    public function startPaymentThreeDSession( $callbackUrl, $amount, $installment = 0, $orderId = "", $currency = 949 ) {
        return $this->post( "startPaymentThreeDSession", $this->params( [
            'callbackUrl'      => $callbackUrl,
            'orderId'          => $orderId,
            'amount'           => $amount,
            'currency'         => $currency,
            'installmentCount' => $installment,
        ] ) );
    }

    public function startPreAuthThreeDSession( $callbackUrl, $amount, $installment = 0, $orderId = "", $currency = 949 ) {
        return $this->post( "startPreAuthThreeDSession", $this->params( [
            'callbackUrl'      => $callbackUrl,
            'orderId'          => $orderId,
            'amount'           => $amount,
            'currency'         => $currency,
            'installmentCount' => $installment,
        ] ) );
    }

    public function threeDSessionResult( $threeDSessionId ) {
        return $this->post( "threeDSessionResult", $this->params( [
            'threeDSessionId' => $threeDSessionId,
        ] ) );
    }

    public function processThreeD( $threeDSessionId, $orderId ) {
        return $this->post( "processThreeD", $this->params( [
            'threeDSessionId' => $threeDSessionId,
            'orderId'         => $orderId,
        ] ) );
    }

    public function setPost( $data ) {
        $this->postdata = $data;

        return $this;
    }

    public function isSuccessfull() {

        if ( $this->validateHash( $this->postdata ) ) {
            return isset( $this->postdata['BankResponseCode'] ) && $this->postdata['BankResponseCode'] === '00';
        }

        return false;
    }

    public function validateHash( $data ) {
        if ( isset( $data['HashParameters'] ) ) {
            $keys = explode( ",", $data['HashParameters'] );

            $extra = [
                'ClientId' => $this->clientId,
                'ApiUser'  => $this->apiUser,
            ];

            $hashString = $this->apiPass;

            foreach ( $keys as $key ) {
                $hashString .= isset( $extra[ $key ] ) ? $extra[ $key ] : $data[ $key ];
            }

            $hashingbytes = hash( "sha512", ( $hashString ), true );

            return $data['Hash'] === base64_encode( $hashingbytes );
        }

        return false;
    }

    public function getOrderId() {
        return isset( $this->postdata['OrderId'] ) ? $this->postdata['OrderId'] : null;
    }

    public function getError() {
        if ( ! $this->validateHash( $this->postdata ) ) {
            return 'Hash doğrulama başarısız';
        }

        return isset( $this->postdata['BankResponseMessage'] ) ? $this->postdata['BankResponseMessage'] : null;
    }

    public function getFormParams( $id, $name, $cardNumber, $expiry, $cvv ) {
        return [
            'ThreeDSessionId' => $id,
            'CardHolderName'  => $name,
            'CardNo'          => $cardNumber,
            'ExpireDate'      => $expiry,
            'Cvv'             => $cvv,
        ];
    }

    public function getFormUrl() {
        return "{$this->url}ProcessCardForm";
    }

    public function getFrameUrl( $id ) {
        return "{$this->url}threeDSecure/{$id}";
    }
}

