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
        $requestPhones = $request->request->get('phones');
        $url = $request->request->get('url');
        $comment = trim($request->request->get('comment'));
        $title = $request->request->get('title');
        $description = $request->request->get('description');

        if (empty($comment)) {
            return $this->errorResponse('Comment required');
        }

        if (empty($requestPhones)) {
            return $this->errorResponse('Phones required');
        }

        $phoneService = $this->get('est.phone');
        $phones = [];
        $invalid = [];

        foreach ($requestPhones as $phone) {
            if ($phoneService->valid($phone)) {
                $phones[] = $phoneService->normalize($phone);
            } else {
                $invalid[] = $phone;
            }
        }

        if (empty($phones)) {
            return $this->errorResponse("Invalid phone '{$invalid[0]}'");
        }

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

        $phoneService = $this->get('est.phone');

        if ($phoneService->valid($phone)) {
            return $this->successResponse([
                'items' => $this->get('est.advertisement')->findByPhone(
                    $phoneService->normalize($phone)
                )
            ]);

        }

        return $this->errorResponse("Invalid phone '$phone'");
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
     *    description="search",
     *    parameters={
     *        {"name"="url", "dataType"="string", "required"=false},
     *        {"name"="phones", "dataType"="array", "required"=false}
     *    }
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function searchAction(Request $request)
    {
        $url = $request->query->get('url');
        $requestPhones = $request->query->get('phones');

        $phoneService = $this->get('est.phone');

        $phones = array_filter($requestPhones, [$phoneService, 'valid']);

        return $this->successResponse([
            'url' => $this->get('est.advertisement')->existUrl($url),
            'phones' => $this->get('est.agent.phone')->existMap($phones),
        ]);
    }
}
