<?php

namespace App\Workspace\Domain\Model;

interface WorkspaceRepositoryInterface
{
    /**
     * @param WorkspaceId $id
     * @return Workspace|null
     */
    public function findById(WorkspaceId $id): ?Workspace;

    /**
     * @param string $name
     * @return Workspace|null
     */
    public function findByName(string $name): ?Workspace;

    /**
     * @return Workspace|null
     */
    public function findDefaultWorkspace(): ?Workspace;

    /**
     * @param Workspace $workspace
     */
    public function add(Workspace $workspace): void;

    /**
     * @param Workspace $workspace
     */
    public function remove(Workspace $workspace): void;

    /**
     * @return WorkspaceId
     */
    public function nextId(): WorkspaceId;
}