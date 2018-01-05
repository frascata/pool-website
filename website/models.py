from django.db import models
from django.utils.translation import ugettext_lazy as _


class Category(models.Model):
    """
    A category for grouping projects.
    """
    title_it = models.CharField(max_length=500)
    title_en = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        verbose_name = _("Project Category")
        verbose_name_plural = _("Project Categories")
        ordering = ("title_it",)

    def __str__(self):
        return self.title_it

    def __unicode__(self):
        return self.title_it

    def title(self, language):
        title = None
        if language == 'it' and self.title_it:
            title = self.title_it
        if language == 'en' and self.title_en:
            title = self.title_en
        return title


class Partner(models.Model):
    """
    A category for grouping projects.
    """
    name = models.CharField(max_length=256)

    class Meta:
        verbose_name = _("Project Partner")
        verbose_name_plural = _("Project Partners")
        ordering = ("name",)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name


class Phase(models.Model):
    """
    A category for grouping projects.
    """
    title_it = models.CharField(max_length=500)
    title_en = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        verbose_name = _("Project Phase")
        verbose_name_plural = _("Project Phases")
        ordering = ("title_it",)

    def __str__(self):
        return self.title_it

    def __unicode__(self):
        return self.title_it

    def title(self, language):
        title = None
        if language == 'it' and self.title_it:
            title = self.title_it
        if language == 'en' and self.title_en:
            title = self.title_en
        return title
