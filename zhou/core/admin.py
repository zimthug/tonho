from django.contrib import admin
from .models import School


admin.site.site_title = "Tonho Site Admin"
admin.site.site_header = "Tonho administration"
admin.site.index_title = "Site administration"

admin.site.register(School)
