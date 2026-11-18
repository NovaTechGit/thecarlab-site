/// <reference path="../pb_data/types.d.ts" />
// Adds "reportPDF" (the finished print view made by the iPad) and "reportStamp" to
// inspections, service_jobs and service_contracts. The PDF is protected (opens only for signed-in users).
migrate((app) => {
  for (const name of ["inspections", "service_jobs", "service_contracts"]) {
    const c = app.findCollectionByNameOrId(name)
    if (!c.fields.getByName("reportPDF")) {
      c.fields.add(new FileField({ name: "reportPDF", required: false, maxSelect: 1, maxSize: 52428800, protected: true, mimeTypes: ["application/pdf"] }))
    }
    if (!c.fields.getByName("reportStamp")) {
      c.fields.add(new TextField({ name: "reportStamp", required: false }))
    }
    app.save(c)
  }
}, (app) => {
  for (const name of ["inspections", "service_jobs", "service_contracts"]) {
    const c = app.findCollectionByNameOrId(name)
    c.fields.removeByName("reportPDF")
    c.fields.removeByName("reportStamp")
    app.save(c)
  }
})
