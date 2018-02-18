from django.contrib import admin
from django.contrib.admin import ModelAdmin
from website.models import Partner, Category, Phase


class CategoryAdmin(ModelAdmin):
    class Meta:
        model = Category

    list_display = ('title_it', 'title_en',)


class PhaseAdmin(ModelAdmin):
    class Meta:
        model = Phase

    list_display = ('title_it', 'title_en',)


class PartnerAdmin(ModelAdmin):
    class Meta:
        model = Partner

    list_display = ('name', 'type', 'description_it', 'description_en', 'website_url',)


# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Phase, PhaseAdmin)
admin.site.register(Partner, PartnerAdmin)
