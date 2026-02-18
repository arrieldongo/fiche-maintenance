# Structure Firebase – Maintenances

## Collection principale

- **Collection**: `maintenances`
- **Document ID**: auto-ID Firestore (ou UUID applicatif si besoin)

## Champs du document `maintenances/{maintenanceId}`

| Champ | Type Firestore | Obligatoire | Description |
|---|---|---|---|
| `title` | string | oui | Titre de l'action de maintenance |
| `machine` | string | oui | Nom/référence de la machine |
| `startAt` | timestamp | oui | Date/heure de début |
| `endAt` | timestamp | oui | Date/heure de fin |
| `enabled` | boolean | oui | Maintenance activée/désactivée |
| `status` | string | oui | Statut métier (`planned`, `in_progress`, `completed`, `cancelled`) |
| `createdByUid` | string | oui | UID Firebase Auth du manager créateur |
| `createdByName` | string | non | Nom affiché du créateur |
| `createdAt` | timestamp | oui | Date de création (`serverTimestamp`) |
| `updatedAt` | timestamp | oui | Date de dernière modification (`serverTimestamp`) |

## Règles métier recommandées

- `startAt <= endAt`
- `status` doit appartenir à la liste: `planned`, `in_progress`, `completed`, `cancelled`
- Si `enabled` est `false`, la maintenance n'est pas visible pour les techniciens sur le planning.

## Requêtes UI attendues

### Page Gestion (manager)
- Liste des maintenances triée par `startAt` descendant.
- Création d'une maintenance.

### Page Planning (technicien)
- Liste des maintenances **activées** triée par `startAt` ascendant.
- Filtre recommandé : `enabled == true`.

## Navigation

- Depuis la page planning, un clic sur une maintenance redirige vers `index.html?maintenanceId={id}`.
