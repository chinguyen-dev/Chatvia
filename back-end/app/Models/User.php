<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class, 'user_id')->orWhere('contacted_id', $this->id);
    }

    public function rooms(): BelongsToMany
    {
        return $this->belongsToMany(Room::class, 'participants', 'user_id', 'room_id');
    }

    public function canJoinRoom(int $roomId): bool
    {
        return $this->rooms->contains('id', $roomId);
    }

    public function checkRoomExist(string $room_type, int $receiverId = null, string $room_name = null)
    {
        $rooms = $this->rooms()->where('type', $room_type)->get();
        if ($room_name) return $rooms->search(fn(object $room) => $room->name == $room_name);
        if ($receiverId) {
            foreach ($rooms as $room) {
                if ($room->members->contains('id', $receiverId)) return $room;
            }
        }
        return false;
    }
}
