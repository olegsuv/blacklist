<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ApiEstateAgentController extends Controller
{
    public function createAction()
    {
        return new JsonResponse([], JsonResponse::HTTP_CREATED);
    }
}
