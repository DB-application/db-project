<?php
declare(strict_types=1);

namespace App\User\Infrastructure\Query\Hydrator;

use App\Common\Infrastructure\Query\TypeConverter;
use App\User\App\Data\UserData;
use App\User\Infrastructure\Query\Table\UserTable;

class UserDataHydrator
{
    public function hydrateAll(array $data): UserData
    {
        $userId = TypeConverter::hydrateValue($data[UserTable::USER_ID], UserTable::$typeMap[UserTable::USER_ID]);
        $email = TypeConverter::hydrateValue($data[UserTable::EMAIL], UserTable::$typeMap[UserTable::EMAIL]);
        $password = TypeConverter::hydrateValue($data[UserTable::PASSWORD], UserTable::$typeMap[UserTable::PASSWORD]);
        $username = TypeConverter::hydrateValue($data[UserTable::USERNAME], UserTable::$typeMap[UserTable::USERNAME]);
        $loginKey = TypeConverter::hydrateValue($data[UserTable::LOGIN_KEY], UserTable::$typeMap[UserTable::LOGIN_KEY]);
        $firstName = TypeConverter::hydrateValue($data[UserTable::FIRST_NAME], UserTable::$typeMap[UserTable::FIRST_NAME]);
        $lastName = TypeConverter::hydrateValue($data[UserTable::LAST_NAME], UserTable::$typeMap[UserTable::LAST_NAME]);
        $phone = TypeConverter::hydrateValue($data[UserTable::PHONE], UserTable::$typeMap[UserTable::PHONE]);
        $avatarUrl = TypeConverter::hydrateValue($data[UserTable::AVATAR_URL], UserTable::$typeMap[UserTable::AVATAR_URL]);
        $userData = new UserData($userId, $email, $password, $loginKey, $username, );
    }
}