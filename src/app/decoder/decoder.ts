
interface Department {
    id: number;
    name: string;
}

interface JwtPayload {
    id: string;
    isAdmin: number;
    department: Department;
    username: string;
    sub: string;
    iat: number;
    exp: number;
}

export class Decoder {
    base64UrlDecode(str: string): string {
        return decodeURIComponent(atob(str.replace(/-/g, '+').replace(/_/g, '/'))
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''));
    }
    
    
    
    decodeJwt(token: string): JwtPayload | null {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = this.base64UrlDecode(base64);
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Invalid JWT token:', error);
            return null;
        }
    }
}

