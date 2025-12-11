# Session Modes & Context (ShotSpec Phone App)

The ShotSpec phone app always asks the golfer **“Where are you playing today?”** at the start of a session.

This choice sets a `mode` flag that flows through the whole system (phone → cloud → models → rewards).

---

## Session Modes

We currently support three primary modes:

- `on_course` – Playing a normal round of golf on a course.
- `driving_range` – Hitting balls on a driving range (with or without partner hardware).
- `backyard_sim` – Hitting on a home sim, net, or practice area (indoor or backyard).

These are represented as a simple enum / string union in the app and serialized into the ShotSpec JSON for each shot.

---

## Context Object (per shot)

Every shot includes a `context` object that at minimum carries the session mode:

```json
{
  "context": {
    "mode": "driving_range"
  }
}
