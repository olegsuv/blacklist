<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class ApiEstateAdvertisementController extends ApiAbstractController
{
    /**
     * @ApiDoc(
     *    section="estate-advertisement",
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

        $this->get('est.advertisement')->create($comment, $phones, $url, $title, $description);

        return $this->successResponse();
    }

    /**
     * @ApiDoc(
     *    section="estate-advertisement",
     *    description="Find by phone",
     *    requirements={
     *        {"name"="phone", "dataType"="string", "required"=true}
     *    }
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function findPhoneAction(Request $request)
    {
        $phone = $request->query->get('phone');

        return $this->successResponse([
            'items' => $this->get('est.advertisement')->findByPhone($phone)
        ]);
    }

    /**
     * @ApiDoc(
     *    section="estate-advertisement",
     *    description="Find by url",
     *    parameters={
     *        {"name"="url", "dataType"="string", "required"=true}
     *    }
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function findUrlAction(Request $request)
    {
        $url = $request->query->get('url');

        return $this->successResponse([
            'items' => $this->get('est.advertisement')->findByUrl($url)
        ]);
    }

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
