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

            $advertisement->addPhoneLink($advertisementToPhone);
            $this->doctrine->getManager()->persist($advertisementToPhone);;
        }

        $this->doctrine->getManager()->persist($advertisement);
        $this->doctrine->getManager()->flush();

        return $advertisement;

    }

    public function findByContacts($url, array $phones)
    {
        $merge = [];

        if ($url) {
            $merge = $this->doctrine->getRepository('AppBundle:SAdvertisement')->findByUrl($url);
        }

        if ($phones) {
            $merge = array_merge($merge, $this->doctrine->getRepository('AppBundle:SAdvertisement')->findByPhones($phones));
        }

        return $this->prepareFullData($merge);
    }

    public function prepareFullData(array $source)
    {
        if (empty($source)) {
            return [];
        }

        $map = [];

        foreach ($source as $entry) {
            $map[$entry['id']] = [
                'comment' => $entry['comment'],
                'url' => $entry['url'],
                'phones' => [],
            ];
        }

        $idList = array_keys($map);

        $advertisementIdPhoneList = $this
            ->doctrine
            ->getRepository('AppBundle:SAdvertisementToPhone')
            ->getAdvertisementIdPhoneList($idList);

        foreach ($advertisementIdPhoneList as $advertisementIdPhone) {
            $map[$advertisementIdPhone['advertisementId']]['phones'][] = $advertisementIdPhone['phone'];
        }

        return array_values($map);
    }
}
