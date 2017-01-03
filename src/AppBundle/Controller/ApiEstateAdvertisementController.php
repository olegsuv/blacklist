<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class ApiEstateAdvertisementController extends ApiAbstractController
{
    /**
     * @ApiDoc(
     *  section="estate-advertisement",
     *  description="Create",
     *  requirements={
     *      {"name"="phones", "dataType"="string", "required"=true, "description"="string or array of strings"},
     *      {"name"="comment", "dataType"="string", "required"=true},
     *  },
     *  parameters={
     *      {"name"="url", "dataType"="string", "required"=false},
     *      {"name"="title", "dataType"="string", "required"=false},
     *      {"name"="description", "dataType"="string", "required"=false},
     *  }
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

        $requestPhones = (array)$requestPhones;

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

        $this->get('est.advertisement')->create($comment, array_unique($phones), $url, $title, $description);

        return $this->successResponse();
    }

    /**
     * @ApiDoc(
     *    section="estate-advertisement",
     *    description="search",
     *    parameters={
     *        {"name"="url", "dataType"="string", "required"=false},
     *        {"name"="phones", "dataType"="array", "required"=false, "description"="string or array of strings"}
     *    }
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function searchAction(Request $request)
    {
        $url = $request->query->get('url');
        $requestPhones = (array)$request->query->get('phones');

        $phoneService = $this->get('est.phone');

        $phones = array_unique(array_filter($requestPhones, [$phoneService, 'valid']));

        return $this->successResponse([
            'items' => $this->get('est.advertisement')->findByContacts($url, $phones)
        ]);
    }
}
