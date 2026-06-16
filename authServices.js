import argon2 from "argon2"

const PEPPER = process.env.PEPPER
const AuthorPEPPER = process.env.AUTHOR_PEPPER

const policy = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
    saltLength: 16,
    hashLength: 32
}

export async function hashPassword(password) {
    return await argon2.hash(password + PEPPER, {
        ...policy,
        raw:false,
    })
}

export async function authorHashPassword(password) {
    return await argon2.hash(password + AuthorPEPPER, {
        ...policy,
        raw: false
    })
}

export async function verifyPassword(storedHash, inputPassword) {
    return argon2.verify(storedHash, inputPassword + PEPPER)
}

export async function authorVerifyPassword(storedHash, inputPassword) {
    return argon2.verify(storedHash, inputPassword + AuthorPEPPER)
}