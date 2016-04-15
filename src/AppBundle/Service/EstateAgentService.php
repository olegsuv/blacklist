<?php

namespace AppBundle\Service;

use AppBundle\Entity\SAdvertisement;
use AppBundle\Entity\SEstateAgentPhone;
use AppBundle\Entity\SAdvertisementToPhone;
use Doctrine\Bundle\DoctrineBundle\Registry;

class EstateAgentService
{
    private $doctrine;

    private $phoneService;

    public function __construct(Registry $doctrine, EstateAgentPhoneService $phoneService)
    {
        $this->doctrine = $doctrine;
        $this->phoneService = $phoneService;
    }

    public function create($comment, array $phones, $url, $title, $description)
    {
        $phoneCompleteList = $this->phoneService->complete($phones);

        $advertisement = new SAdvertisement();

        $advertisement
            ->setComment($comment)
            ->setUrl($url)
            ->setTitle($title)
            ->setDescription($description)
            ->setInserted(new \DateTime());

        foreach ($phoneCompleteList as $phoneComplete) {
            $advertisementToPhone = new SAdvertisementToPhone();

            $advertisementToPhone
                ->setAdvertisement($advertisement)
                ->setPhone($phoneComplete);

            $advertisement->addPhone($advertisementToPhone);
            $this->doctrine->getManager()->persist($advertisementToPhone);;
        }

        $this->doctrine->getManager()->persist($advertisement);
        $this->doctrine->getManager()->flush();

        return $advertisement;

    }

    public function findByPhone($phone)
    {
        return [];
    }
}
