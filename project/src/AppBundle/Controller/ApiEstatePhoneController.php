<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class ApiEstatePhoneController extends ApiAbstractController
{
    /**
     * @ApiDoc(
     *    section="estate-advertisement",
     *    description="All phones"
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function allPhoneAction(Request $request)
    {
        return $this->successResponse([
            'items' => $this->get('est.agent.phone')->getAll()
        ]);
    }
}
