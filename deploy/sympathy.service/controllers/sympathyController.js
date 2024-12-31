import {db} from '../db/db.js';
import {USERS_API_URL} from '../config.js';

export class SympathyController {
    create = async (req, reply) => {
        const { from_user_id, to_user_id } = req.body || {};
    
        if (!from_user_id || !to_user_id) {
            return reply.status(400).send({ error: "invalid" });
        }
    
        try {
            await db("sympathy").insert({
                from_user_id,
                to_user_id,
                created_at: new Date(),
            });

            return reply.status(201).send({data: 'success'});
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: "Internal Server Error" });
        }
    }

    getSympathies = async(req, reply) => {
        const {from_user_id} = req.query || {};

        try {
            const sympathies = await db("sympathy")
            .select()
            .where({from_user_id})
            .orWhere({to_user_id: from_user_id})
            .limit(50);

            const userIds = sympathies.reduce((acc, { to_user_id, from_user_id }) => {
                acc.push(to_user_id, from_user_id);
                return acc;
            }, []);
    
            const uniqUserIds = [...new Set(userIds)];
    
            let users = [];
            const queryString = new URLSearchParams({
                ids: uniqUserIds,
            }).toString();
    
            try {
                const response = await fetch(
                    `${USERS_API_URL}/users?${queryString}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const { result } = await response.json();
                users = result;
            } catch (error) {
                console.error("Error fetching users:", error);
            }
    
            const data = sympathies.map((item) => {
                const userFromInfo = users.find(
                    ({ id }) => id === item.from_user_id
                );
                const userToInfo = users.find(({ id }) => id === item.to_user_id);
    
                return {
                    ...item,
                    userFromInfo,
                    userToInfo,
                };
            });

            return reply.send({data});
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: "Internal Server Error" });
        }
    }

}