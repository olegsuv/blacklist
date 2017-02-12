<?php

namespace AppBundle\Service;

use AppBundle\Entity\SEstateAgentPhone;
use Doctrine\Bundle\DoctrineBundle\Registry;

class EstateAgentPhoneService
{
    private $doctrine;
    private $phoneService;

    public function __construct(Registry $doctrine, PhoneService $phoneService)
    {
        $this->doctrine = $doctrine;
        $this->phoneService = $phoneService;
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

    public function existMap(array $phones)
    {
        if (empty($phones)) {
            return null;
        }

        $normalizeMap = [];
        $deNormalizeListMap = [];

        foreach ($phones as $phone) {
            $normalize = $this->phoneService->normalize($phone);
            $normalizeMap[$phone] = $normalize;
            $deNormalizeListMap[$normalize][] = $phone;
        }

        $exists = $this->doctrine->getRepository('AppBundle:SEstateAgentPhone')->existList(array_values($normalizeMap));

        $map = array_fill_keys($phones, false);

        foreach ($exists as $normalize) {
            foreach ($deNormalizeListMap[$normalize] as $phone) {
                $map[$phone] = true;
            }
        }

        return $map;
    }
}
