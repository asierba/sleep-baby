# ADR-002: Use expo-sqlite for local data persistence

**Date:** 2026-02-10
**Status:** Accepted
**Decision-makers:** Sara, Mike, Alex
**Consulted:** _None identified_
**Informed:** _To be defined - not yet discussed_

---

## Context and Problem Statement

With React Native and Expo chosen as the platform (ADR-001), the team needed to select a local data persistence solution. Sleepy Baby is local-only (no backend, no cloud sync), so all sleep tracking data and baby profile information must be stored on-device. The data model includes two relational tables (baby, sleep_entry with foreign key) and the sleep history view requires querying entries grouped by day in reverse chronological order.

## Decision Drivers

* Structured relational data — two tables with a foreign key relationship (baby → sleep_entry)
* Query capabilities — history view needs filtering, grouping by day, and reverse chronological sorting
* First-party Expo support — minimize dependency risk and maintenance burden
* Simplicity — MVP scope, avoid unnecessary abstraction layers

## Considered Options

* expo-sqlite
* AsyncStorage
* MMKV
* WatermelonDB

## Decision Outcome

Chosen option: "expo-sqlite", because it provides first-party Expo support, SQL query capabilities needed for the history view, and a structured schema that naturally fits the sleep entry and baby profile data model.

### Consequences

* Good, because SQL queries enable efficient filtering and grouping for the sleep history view (group by day, reverse chronological)
* Good, because first-party Expo library — maintained by the Expo team, minimal integration friction
* Good, because relational schema maps directly to the data model (baby table, sleep_entry table with FK)
* Good, because repository pattern encapsulates all SQL, keeping the rest of the app storage-agnostic
* Neutral, because requires writing raw SQL queries rather than using an ORM
* Neutral, because migration strategy will be needed if schema evolves post-MVP

### Confirmation

* Data repository layer successfully performs CRUD operations on baby and sleep_entry tables
* Sleep history view queries return entries grouped by day in reverse chronological order
* expo-sqlite works correctly on both Expo web target and native builds

## Pros and Cons of the Options

### expo-sqlite

First-party Expo SQLite wrapper. Full SQL support, relational schema, file-based database on device.

* Good, because first-party Expo support — maintained alongside the framework
* Good, because full SQL query language for complex queries (joins, grouping, ordering)
* Good, because structured schema enforces data integrity (types, foreign keys, NOT NULL)
* Good, because well-suited for relational data with foreign key relationships
* Neutral, because requires writing raw SQL (no query builder or ORM)
* Bad, because slightly more setup than key-value stores (schema creation, migrations)

### AsyncStorage

Key-value storage. The de facto simple persistence for React Native. Stores JSON strings by key.

* Good, because extremely simple API — get/set by key
* Good, because widely used in React Native ecosystem
* Bad, because no query capabilities — would need to load all entries and filter in memory
* Bad, because no relational structure — foreign keys and joins not possible
* Bad, because poor fit for history view requiring sorted, grouped, filtered queries
* Bad, because not designed for structured, growing datasets

### MMKV

High-performance key-value storage using memory-mapped files. Faster than AsyncStorage.

* Good, because very fast read/write performance
* Good, because simple API similar to AsyncStorage
* Bad, because key-value only — same query limitations as AsyncStorage
* Bad, because no relational structure or SQL support
* Bad, because third-party dependency (react-native-mmkv), not first-party Expo
* Bad, because designed for small config/preferences data, not structured records

### WatermelonDB

Reactive ORM built on top of SQLite. Designed for complex React Native apps with large datasets.

* Good, because built on SQLite — retains SQL query power under the hood
* Good, because reactive — automatically re-renders components when data changes
* Good, because ORM provides type-safe queries without raw SQL
* Bad, because significant additional abstraction for an MVP with two simple tables
* Bad, because third-party dependency with its own learning curve
* Bad, because over-engineered for current scope — adds complexity without proportional benefit

## More Information

This decision was made alongside the platform decision (ADR-001) during initial technical planning on 2026-02-10. The local-only constraint (no backend, no cloud sync) is a confirmed MVP assumption — see specs/sleepy-baby-mvp.md, Assumption #3.
