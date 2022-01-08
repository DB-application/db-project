<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Model;

class Note
{
    /** @var NoteId */
    private $id;
    /** @var string */
    private $name;
    /** @var string */
    private $content;
    /** @var WorkspaceId */
    private $workspaceId;

    public function __construct(NoteId $id, WorkspaceId $workspaceId, string $name, string $content)
    {
        $this->id = $id;
        $this->name = $name;
        $this->content = $content;
        $this->workspaceId = $workspaceId;
    }

    public function getId(): NoteId
    {
        return $this->id;
    }

    public function getWorkspaceId(): WorkspaceId
    {
        return $this->workspaceId;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function setContent(string $content): void
    {
        $this->content = $content;
    }
}