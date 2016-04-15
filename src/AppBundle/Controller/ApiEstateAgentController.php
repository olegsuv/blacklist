<?php

namespace AppBundle\Controller;

use AppBundle\Entity\SEstateAgentPhone;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class ApiEstateAgentController extends ApiAbstractController
{
    /**
     * @ApiDoc(
     *    section="estate-agent",
     *    description="Create",
     *    requirements={
     *        {"name"="phone", "dataType"="string", "required"=true}
     *    }
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function createAction(Request $request)
    {
        $phone = $request->request->get('phone');

        $agentPhone = new SEstateAgentPhone();

        $agentPhone
            ->setPhone($phone)
            ->setInserted(new \DateTime());

        $this->get('doctrine')->getManager()->persist($agentPhone);
        $this->get('doctrine')->getManager()->flush();

        return $this->successResponse();
    }

    /**
     * @ApiDoc(
     *    section="estate-agent",
     *    description="Find",
     *    parameters={
     *        {"name"="phone", "dataType"="string", "required"=false}
     *    }
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function findAction(Request $request)
    {
        $phone = $request->query->get('phone');

        $agentPhone = $this
            ->get('doctrine')
            ->getRepository('AppBundle:SEstateAgentPhone')
            ->findOneBy(['phone' => $phone]);

        if ($agentPhone) {
            return $this->successResponse([
                'data' => [
                    'phone' => $agentPhone->getPhone()
                ],
            ]);

        }

        return $this->successResponse([
            'data' => null,
        ]);
    }
}
