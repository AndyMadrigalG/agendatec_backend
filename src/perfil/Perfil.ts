// Perfil.ts
import { UsuariosDto } from '../usuarios/dto/usuarios.dto';
import { MiembroJuntaDto } from '../miembroJunta/dto/miembroJunta.dto';


// Interfaz Perfil
interface Perfil {
    obtenerNombre(): string;
    obtenerPerfil(): string;
}

// Enum Tipo_Perfil
enum Tipo_Perfil {
    ADMIN = 'Administrador',
    USER = 'Usuario',
    MIEMBRO = 'Miembro de Junta',
}

// Clase Usuario_Adapter
class Usuario_Adapter implements Perfil {
    private adaptado: UsuariosDto;
    public perfil: Tipo_Perfil;

    constructor(usuario: UsuariosDto, tipo_perfil: Tipo_Perfil = Tipo_Perfil.USER) {
        this.adaptado = usuario;
        this.perfil = tipo_perfil
    }

    obtenerNombre(): string {
        return this.adaptado.nombre;
    }

    obtenerPerfil(): string {
        return this.perfil;
    }
}

// Clase Miembro_Adapter
class Miembro_Adapter implements Perfil {
    private adaptado: MiembroJuntaDto;
    public perfil: Tipo_Perfil;

    constructor(miembro: MiembroJuntaDto, tipoperfil: Tipo_Perfil = Tipo_Perfil.MIEMBRO) {
        this.adaptado = miembro;
        this.perfil = tipoperfil;
    }

    obtenerNombre(): string {
        return this.adaptado.usuario_id.toString();
    }

    obtenerPerfil(): string {
        return this.perfil.toString();
    }

}