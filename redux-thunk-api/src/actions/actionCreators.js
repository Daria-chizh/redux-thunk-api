import {
  REMOVE_SERVICE, LOAD_SERVICES, EDIT_SERVICE,
  FETCH_START, FETCH_ERROR, FETCH_DONE,
} from "./actionTypes";

// actions for service list reducer

export function loadServices(services) {
  return { type: LOAD_SERVICES, payload: { services } };
}

export function removeService(id) {
  return { type: REMOVE_SERVICE, payload: { id } }
}

export function editService(id, name, price) {
  return { type: EDIT_SERVICE, payload: { id, name, price } };
}

// actions for fetcher reducer

export function fetchStart() {
  return { type: FETCH_START };
}

export function fetchDone() {
  return { type: FETCH_DONE };
}

export function fetchError(error) {
  return { type: FETCH_ERROR, payload: { error } };
}

export function removeServiceRemote(id) {
  return async (dispatch) => {
    await fetch(`http://localhost:7070/api/services/${id}`, { method: 'DELETE' });
    dispatch(removeService(id));
  };
}

export function fetchServices() {
  return async (dispatch) => {
    dispatch(fetchStart());

    try {
      const response = await fetch('http://localhost:7070/api/services');
      const services = await response.json();
      dispatch(loadServices(services));
      dispatch(fetchDone());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
}

export function fetchService(id) {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const response = await fetch(`http://localhost:7070/api/services/${id}`);
      const data = await response.json();
      dispatch(fetchDone());
      return data;
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
}

export function editServiceRemote(id, service) {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      await fetch('http://localhost:7070/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(service) });
      editService(id, service.name, service.price);
      dispatch(fetchDone());
      return true;
    } catch (error) {
      dispatch(fetchError(error));
      return false;
    }
  };
}
