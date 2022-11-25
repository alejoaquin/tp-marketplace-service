import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTokenRequest, TokenEntity } from 'src/domain';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(TokenEntity)
        private tokenRepository: Repository<TokenEntity>,
    ) {}

    async create(createUserTokenDto: CreateTokenRequest): Promise<TokenEntity> {
        const userToken = this.tokenRepository.create(createUserTokenDto);
        return await this.tokenRepository.save(userToken);
    }

    async deleteAll(id: string): Promise<{ ok?: number; n?: number }> {
        const r = await this.tokenRepository.delete({ id: id });
        return { ok: r.affected, n: r.affected };
    }

    async exists(id: string, token: string): Promise<boolean> {
        return (
            (await this.tokenRepository.countBy({ id: id, token: token })) > 0
        );
    }
}
