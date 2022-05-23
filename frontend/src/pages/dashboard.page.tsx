import { CircularProgress } from '@mui/material';
import { RouteComponentProps } from '@reach/router';
import React, { FC, useEffect, useState } from 'react';
import { BackendClient } from '../clients/backend.client';
import { UserCard } from '../components/users/user-card';
import { IUserProps } from '../dtos/user.dto';

const backendClient = new BackendClient();

export const DashboardPage: FC<RouteComponentProps> = () => {
  const [users, setUsers] = useState<IUserProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await backendClient.getAllUsers();
      setUsers(result.data.slice(0, 10));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress size="60px" />
          </div>
        ) : (
          <div>
            {users.length
              ? users.map((user) => {
                  return <UserCard key={user.id} {...user} />;
                })
              : null}
          </div>
        )}
      </div>
    </div>
  );
};
