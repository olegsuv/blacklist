<?php

namespace AppBundle\Service;

class PhoneService
{
    private $codes = ['039', '050', '063', '066', '067', '068', '073', '091', '092', '093', '094', '095', '096', '097', '098', '099'];

    public function valid($phone)
    {
        $onlyNumber = $this->digits($phone);

        if (strlen($onlyNumber) < 9) {
            return false;
        }

        $code = substr($onlyNumber, -10, 3);

        return in_array($code, $this->codes);
    }

    public function normalize($phone)
    {
        $onlyNumber = $this->digits($phone);

        $required = substr($onlyNumber, -10);

        return "38$required";
    }

    private function digits($phone)
    {
        return preg_replace('/\D/', '', $phone);
    }
}
