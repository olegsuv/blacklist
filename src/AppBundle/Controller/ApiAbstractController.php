<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiAbstractController extends Controller
{
    protected function errorResponse($message, $status = JsonResponse::HTTP_BAD_REQUEST)
    {
        $response = [
            'success' => false,
            'message' => $message
        ];

        return $this->response($response, $status);
    }

    /**
     * @param string $message
     * @param array $data
     * @return JsonResponse
     */
    protected function successResponse(array $data = [])
    {
        $data['success'] = true;

        return $this->response($data);
    }

    protected function response($data, $status = JsonResponse::HTTP_OK)
    {
        $response = new JsonResponse($data, $status);
        $response->headers->set('Access-Control-Allow-Headers', 'origin, content-type, accept');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT');
        return $response;
    }

    protected function requiredParametersError()
    {
        return $this->errorResponse('Нехватает обязательных параметров!');
    }
}
