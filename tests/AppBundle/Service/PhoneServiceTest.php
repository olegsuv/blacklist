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

    /**
     * @dataProvider invalidDataProvider
     * @param $phone
     */
    public function testInvalid($phone)
    {
        $this->assertFalse($this->getService()->valid($phone));
    }

    public function validDataProvider()
    {
        return [
            ['380631112233'],
            ['38063 111 22 33'],
            ['38(063) 111-22-33'],
            ['8(063) 111-22-33'],
            ['(063) 111-22-33'],
            ['063 111-22-33'],
        ];
    }

    public function invalidDataProvider()
    {
        return [
            [''],
            ['111 22 33'],
            ['09x xxxxxxx'],
        ];
    }

    private function getService()
    {
        return $this->container->get('est.phone');
    }
}
