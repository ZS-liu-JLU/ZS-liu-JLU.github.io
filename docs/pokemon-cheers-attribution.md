# Pokémon cheer corner

The unchanged, transparent HOME sprites are provided by the public
[PokeAPI sprites repository](https://github.com/PokeAPI/sprites):

- Psyduck: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/54.png
- Slowpoke: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/79.png

Pokémon characters belong to their respective rights holders. These sprites
decorate a personal academic homepage; they do not imply an affiliation.

The shared decorative like count uses the public [CountAPI](https://countapi.mileshilliard.com/).
There is no API token or account credential in the site. Both character buttons
share one `sessionStorage` flag and one counter. Refreshing the same tab preserves
the flag. The first real visitor click creates the counter automatically; no
sample likes or initial counter writes are sent.

The flag is reserved before the request. An ambiguous network failure is never
retried during that visit. Repeated clicks still play the character reactions.
Off-domain previews and automated browsers never send counter requests. The
same play-only behavior applies if a browser cannot persist the visit flag.
The counter is decorative, not an authenticated or abuse-resistant voting system.
