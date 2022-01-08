<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Service;

use App\Workspace\Domain\Exception\InvalidNoteIdException;
use App\Workspace\Domain\Model\Note;
use App\Workspace\Domain\Model\NoteId;
use App\Workspace\Domain\Model\NoteRepositoryInterface;
use App\Workspace\Domain\Model\WorkspaceId;

class NoteService
{
    /** @var NoteRepositoryInterface */
    private $repository;

    public function __construct(NoteRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function createNote(WorkspaceId $workspaceId, string $name, string $content): NoteId
    {
        $note = new Note($this->repository->nextId(), $workspaceId, $name, $content);
        $this->repository->add($note);
        return $note->getId();
    }

    /**
     * @param NoteId $id
     * @param string $name
     * @param string $content
     * @throws InvalidNoteIdException
     */
    public function editNote(NoteId $id, string $name, string $content): void
    {
        $note = $this->repository->findById($id);
        if ($note === null)
        {
            throw new InvalidNoteIdException($id);
        }
        $note->setName($name);
        $note->setContent($content);
    }

    /**
     * @param NoteId $id
     * @throws InvalidNoteIdException
     */
    public function removeNote(NoteId $id): void
    {
        $note = $this->repository->findById($id);
        if ($note === null)
        {
            throw new InvalidNoteIdException($id);
        }
        $this->repository->remove($note);
    }
}