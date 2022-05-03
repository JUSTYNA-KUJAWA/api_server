import { API_URL } from '../config';
import axios from 'axios';

export async function getClientId(order) {
    const res = await axios.post(`${API_URL}/clients`, order);
    return res.data['_id']
  }