export default process.env.NODE_ENV === 'production'
    ? 'http://80.251.211.179:3000/api'
    : 'http://localhost:3000/api';
