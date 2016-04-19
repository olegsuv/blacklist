<?php

namespace Tests\AppBundle\Service;

class PhoneServiceTest extends AbstractServiceTest
{
    /**
     * @dataProvider validDataProvider
     * @param $phone
     */
    public function testValid($phone)
    {
        $this->assertTrue($this->getService()->valid($phone));
    }

    public function validDataProvider()
    {
        return [
            ['380631112233'],
        ];
    }

    private function getService()
    {
        return $this->container->get('est.phone');
    }
}
