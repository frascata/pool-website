from string import punctuation

from django.urls import reverse
from django.utils.safestring import mark_safe
from django.utils.translation import ugettext_lazy as _

from django.db import models
from django.db.models import FileField
from django.utils.encoding import force_text
from mezzanine.core.models import Orderable
from mezzanine.utils.models import upload_to


class Image(models.Model):
    file = FileField(_("File"), max_length=200, upload_to=upload_to("galleries.images.file", "galleries"))
    description_it = models.CharField(max_length=1000,
                                      blank=True, null=True)
    description_en = models.CharField(max_length=1000,
                                      blank=True, null=True)

    class Meta:
        verbose_name = _("Image")
        verbose_name_plural = _("Images")

    def __str__(self):
        return self.description_it

    def save(self, *args, **kwargs):
        """
        If no description is given when created, create one from the
        file name.
        """
        if not self.id and not self.description_it and not self.description_en:
            name = force_text(self.file)
            name = name.rsplit("/", 1)[-1].rsplit(".", 1)[0]
            name = name.replace("'", "")
            name = "".join([c if c not in punctuation else " " for c in name])
            # str.title() doesn't deal with unicode very well.
            # http://bugs.python.org/issue6412
            name = "".join([s.upper() if i == 0 or name[i - 1] == " " else s
                            for i, s in enumerate(name)])
            self.description_it = name
            self.description_en = name
        super(Image, self).save(*args, **kwargs)


class Category(models.Model):
    """
    A category for grouping projects.
    """
    title_it = models.CharField(max_length=500)
    title_en = models.CharField(max_length=500)

    class Meta:
        verbose_name = _("Project Category")
        verbose_name_plural = _("Project Categories")
        ordering = ("title_it",)

    def __str__(self):
        return self.title_it


class Project(models.Model):
    """
    A model representing a project
    """
    visible = models.BooleanField(default=False)
    title_it = models.CharField(max_length=500, null=True)
    title_en = models.CharField(max_length=500, null=True)
    description_it = models.TextField(null=True)
    description_en = models.TextField(null=True)
    location = models.CharField(max_length=256, null=True)
    date = models.DateField(null=True)
    categories = models.ManyToManyField("Category",
                                        verbose_name=_("Categories"),
                                        blank=True)
    images = models.ManyToManyField("Image",
                                    verbose_name=_("Images"),
                                    blank=True)

    class Meta:
        verbose_name = _("Project")
        verbose_name_plural = _("Projects")
        ordering = ("-date",)

    def __str__(self):
        return self.title_it

    def admin_categories_link(self):
        base_url = reverse('admin:website_category_changelist')
        url = '{base_url}?project__id__exact={project_id}'.format(base_url=base_url, project_id=self.pk)
        return mark_safe(
            "<a href='{url}'>{label} ({count})</a>".format(url=url, label=Category._meta.verbose_name_plural,
                                                           count=self.categories.count()))

    def admin_images_link(self):
        base_url = reverse('admin:website_image_changelist')
        url = '{base_url}?project__id__exact={project_id}'.format(base_url=base_url, project_id=self.pk)
        return mark_safe("<a href='{url}'>{label} ({count})</a>".format(url=url, label=Image._meta.verbose_name_plural,
                                                                        count=self.images.count()))
