<?php

namespace AppBundle\Service;

use AppBundle\Entity\SEstateAgentPhone;
use Doctrine\Bundle\DoctrineBundle\Registry;

class EstateAgentPhoneService
{
    private $doctrine;

    public function __construct(Registry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    /**
     * @param array $phones
     * @return SEstateAgentPhone[]
     */
    public function complete(array $phones)
    {
        $existList = $this->doctrine->getRepository('AppBundle:SEstateAgentPhone')->findBy([
            'phone' => $phones
        ]);

        $existMap = [];
        foreach ($existList as $existPhone) {
            $existMap[$existPhone->getPhone()] = $existPhone;
        }

        if ($addList = array_diff($phones, array_keys($existMap))) {
            foreach ($addList as $phone) {
                $agentPhone = new SEstateAgentPhone();

                $existMap[$phone] = $agentPhone
                    ->setPhone($phone)
                    ->setInserted(new \DateTime());

                $this->doctrine->getManager()->persist($agentPhone);
            }

            $this->doctrine->getManager()->flush();
        }

        return $existMap;
    }

    public function getAll()
    {
        return $this->doctrine->getRepository('AppBundle:SEstateAgentPhone')->findAll();
    }
}
