DRF token based auth is stateful it requires DB lookups

we will be using JWT

In the frontend the auth will can be done by context API or thru zustand

since evolvium has lots of global state, zustand is also included.

---

we will be storing the JWT access token in state/memory/RAM of the client's computer, not in localstorage or cookies to prevent attackers from accessing it

In-memory state + Access token limit 15 mins --> very secure