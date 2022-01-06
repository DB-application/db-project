<?php
declare(strict_types=1);

namespace App\Controller\Workspace;

use App\Common\Exception\UserNotAuthenticated;
use App\Common\Security\SecurityContextInterface;
use App\Workspace\Api\ApiInterface;
use App\Workspace\App\Data\WorkspaceData;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class WorkspaceController extends AbstractController
{
    /** @var ApiInterface */
    private $workspaceApi;
    /** @var SecurityContextInterface */
    private $securityContext;

    public function __construct(ApiInterface $eventApi, SecurityContextInterface $securityContext)
    {
        $this->workspaceApi = $eventApi;
        $this->securityContext = $securityContext;
    }

    /**
     * @Route("/create/workspace")
     */
    public function createWorkspace(Request $request): Response
    {
        try
        {
            $requestData = json_decode($request->getContent(), true);
            $name = $requestData['name'];
            $workspaceId = $this->workspaceApi->createWorkspace($name, $this->securityContext->getAuthenticatedUserId());
            return new Response(json_encode(['id' => $workspaceId]), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/edit/workspace")
     */
    public function editWorkspace(Request $request): Response
    {
        try
        {
            $requestData = json_decode($request->getContent(), true);
            $name = $requestData['name'];
            $workspaceId = $requestData['id'];
            $this->workspaceApi->editWorkspace($workspaceId, $name);
            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/workspaces")
     */
    public function getWorkspaceList(Request $request): Response
    {
        try
        {
            $workspaces = $this->workspaceApi->getUserWorkspaces($this->securityContext->getAuthenticatedUserId());
            return new Response(json_encode($this->serializeWorkspaceData($workspaces)), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @param WorkspaceData[] $workspaces
     * @return array
     */
    private function serializeWorkspaceData(array $workspaces): array
    {
        $data = [];

        foreach ($workspaces as $workspace)
        {
            $data[] = [
                'id' => $workspace->getWorkspaceId(),
                'ownerId' => $workspace->getOwnerId(),
                'name' => $workspace->getName(),
                'isDefault' => $workspace->isDefault(),
            ];
        }
        return $data;
    }
}