<?php
declare(strict_types=1);

namespace App\Controller\Workspace;

use App\Common\Exception\UserNotAuthenticated;
use App\Common\Security\SecurityContextInterface;
use App\Workspace\Api\ApiInterface;
use App\Workspace\App\Data\NoteData;
use App\Workspace\App\Data\WorkspaceData;
use App\Workspace\Domain\Exception\CannotRemoveDefaultWorkspace;
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
            $requestData = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            $name = $requestData['name'];
            $workspaceId = $this->workspaceApi->createWorkspace($name, $this->securityContext->getAuthenticatedUserId());
            return new Response(json_encode(['id' => $workspaceId]), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        catch (\JsonException $e)
        {
            return new Response(null, Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Route("/edit/workspace")
     */
    public function editWorkspace(Request $request): Response
    {
        try
        {
            $requestData = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            $name = $requestData['name'];
            $workspaceId = $requestData['id'];
            $invitedUserIds = $requestData['invitedUsersIds'];
            $this->workspaceApi->editWorkspace($workspaceId, $name);
            $this->workspaceApi->updateInvitedUsers($workspaceId, $invitedUserIds);

            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        catch (\JsonException $e)
        {
            return new Response(null, Response::HTTP_BAD_REQUEST);
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
     * @Route("/workspace/get_invited_users")
     */
    public function getInvitedUserIds(Request $request): Response
    {
        try
        {
            $requestData = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            $workspaceId = $requestData['workspaceId'];
            $userIds = $this->workspaceApi->getWorkspaceUserIds($workspaceId);
            return new Response(json_encode($userIds, JSON_THROW_ON_ERROR), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }

    }

    /**
     * @Route("/delete/workspace")
     */
    public function removeWorkspace(Request $request): Response
    {
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $requestData = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            $workspaceId = $requestData['workspaceId'];
            $workspace = $this->workspaceApi->getWorkspaceData($workspaceId);
            if ($workspace->getOwnerId() !== $userId)
            {
                return new Response(null, Response::HTTP_FORBIDDEN);
            }
            $this->workspaceApi->removeWorkspace($workspaceId);
            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        catch (CannotRemoveDefaultWorkspace | \JsonException $e)
        {
            return new Response($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Route("/create/note")
     */
    public function createNote(Request $request): Response
    {
        try
        {
            $requestData = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            $title = $requestData['title'];
            $content = $requestData['content'];
            $workspaceId = $requestData['workspaceId'];
            $noteId = $this->workspaceApi->createNote($title, $content, $workspaceId);
            return new Response(json_encode(['noteId' => $noteId]), Response::HTTP_OK);
        }
        catch (\JsonException $e)
        {
            return new Response(null, Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Route("/rename/note")
     */
    public function renameNote(Request $request): Response
    {
        try
        {
            $requestData = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            $name = $requestData['title'];
            $noteId = $requestData['noteId'];
            $this->workspaceApi->renameNote($noteId, $name);
            return new Response(null, Response::HTTP_OK);
        }
        catch (\JsonException $e)
        {
            return new Response(null, Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Route("/edit/note")
     */
    public function editNote(Request $request): Response
    {
        try
        {
            $requestData = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            $content = $requestData['content'];
            $noteId = $requestData['noteId'];
            $this->workspaceApi->editNote($noteId, $content);
            return new Response(null, Response::HTTP_OK);
        }
        catch (\JsonException $e)
        {
            return new Response(null, Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Route("/remove/note")
     */
    public function removeNote(Request $request): Response
    {
        try
        {
            $requestData = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            $noteId = $requestData['noteId'];
            $this->workspaceApi->removeNote($noteId);
            return new Response(null, Response::HTTP_OK);
        }
        catch (\JsonException $e)
        {
            return new Response(null, Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Route("/list/notes")
     */
    public function getWorkspaceNotes(Request $request): Response
    {
        try
        {
            $requestData = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            $workspaceId = $requestData['workspaceId'];
            $notes = $this->workspaceApi->getWorkspaceNotes($workspaceId);
            return new Response(json_encode($this->serializeNoteData($notes)), Response::HTTP_OK);
        }
        catch (\JsonException $e)
        {
            return new Response(null, Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Route("/get/note")
     */
    public function getNoteContent(Request $request): Response
    {
        try
        {
            $requestData = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            $noteId = $requestData['noteId'];
            $note = $this->workspaceApi->getNoteContentById($noteId);
            return new Response(json_encode([
                'content' => $note->getContent(),
                'title' => $note->getTitle(),
            ], JSON_THROW_ON_ERROR), Response::HTTP_OK);
        }
        catch (\JsonException $e)
        {
            return new Response(null, Response::HTTP_BAD_REQUEST);
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

    /**
     * @param NoteData[] $noteData
     * @return array
     */
    private function serializeNoteData(array $noteData): array
    {
        $data = [];
        foreach ($noteData as $note)
        {
            $data[] = [
                'id' => $note->getId(),
                'workspaceId' => $note->getWorkspaceId(),
                'title' => $note->getTitle(),
            ];
        }
        return $data;
    }
}