<?php
declare(strict_types=1);

namespace App\Workspace\App\Data;

class NoteData
{
    /** @var string */
    private $id;
    /** @var string */
    private $title;
    /** @var string */
    private $content;
    /** @var string */
    private $workspaceId;

    public function __construct(string $id, string $title, string $content, string $workspaceId)
    {
        $this->id = $id;
        $this->title = $title;
        $this->content = $content;
        $this->workspaceId = $workspaceId;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function getWorkspaceId(): string
    {
        return $this->workspaceId;
    }
}