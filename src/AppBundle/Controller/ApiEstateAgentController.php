<?php

namespace AppBundle\Controller;

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
        $phones = $request->request->get('phones');
        $url = $request->request->get('url');
        $comment = $request->request->get('comment');
        $title = $request->request->get('title');
        $description = $request->request->get('description');

        $this->get('est.agent')->create($comment, $phones, $url, $title, $description);

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
    public function findPhoneAction(Request $request)
    {
        $phone = $request->query->get('phone');

        return $this->successResponse([
            'items' => $this->get('est.agent')->findByPhone($phone)
        ]);
    }
}
