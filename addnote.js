/// <reference path="../pb_data/types.d.ts" />
// Adds the "lastServiceNote" text field to the vehicles collection (used by "Service done" notes).
migrate((app) => {
  const c = app.findCollectionByNameOrId("vehicles")
  if (!c.fields.getByName("lastServiceNote")) {
    c.fields.add(new TextField({ name: "lastServiceNote", required: false }))
    app.save(c)
  }
}, (app) => {
  const c = app.findCollectionByNameOrId("vehicles")
  c.fields.removeByName("lastServiceNote")
  app.save(c)
})
