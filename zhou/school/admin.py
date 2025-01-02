from django.contrib import admin

from .models import Clazz, Term, TermClazz


admin.site.register(Clazz)


@admin.register(Term)
class TermAdmin(admin.ModelAdmin):
    list_display = ('year', 'name', 'start_date', 'end_date', 'is_active', 'is_enrollment_active')
    list_filter = ('year', 'name')


@admin.register(TermClazz)
class TermClazzAdmin(admin.ModelAdmin):
    list_display = ('term', 'clazz', 'start_on', 'end_on')
    list_filter = ('term', 'clazz')

    def start_on(self, obj):
        return obj.start_date

    def end_on(self, obj):
        return obj.end_date
