import { setRoles } from './clientActions';

// Memoization to prevent unnecessary API calls
let rolesCache = null;

export const getRoles = () => async (dispatch, getState) => {
    // Check if roles are already in the store
    const currentRoles = getState().client.roles;
    if (currentRoles && currentRoles.length > 0) {
        return; // Roles already exist, no need to fetch
    }

    // Check cache
    if (rolesCache) {
        dispatch(setRoles(rolesCache));
        return;
    }

    try {
        // Replace this with your actual API call
        const response = await fetch('/api/roles');
        const roles = await response.json();
        
        // Cache the roles
        rolesCache = roles;
        
        // Dispatch to store
        dispatch(setRoles(roles));
    } catch (error) {
        console.error('Failed to fetch roles:', error);
        // You might want to dispatch an error action here
    }
};
