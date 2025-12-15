import React, { useEffect, useState } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
};

export const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            if (!res.ok) throw new Error('Failed to fetch users');
            const data = await res.json();
            setUsers(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName, email: newEmail }),
            });
            if (!res.ok) throw new Error('Failed to create user');
            const savedUser = await res.json();
            setUsers([...users, savedUser[0]]); // drizzle returns array
            setNewName('');
            setNewEmail('');
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4 border rounded shadow-sm">
            <h2 className="text-xl font-bold mb-4">Users (Database Demo)</h2>

            <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add User
                </button>
            </form>

            <ul className="space-y-2">
                {users.map((user) => (
                    <li key={user.id} className="border-b pb-2">
                        <span className="font-semibold">{user.name}</span> ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};
