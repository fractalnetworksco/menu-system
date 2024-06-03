from django.db import models

class MenuSection(models.Model):
    name = models.CharField(max_length=100)
    note = models.CharField(max_length=200, blank=True, null=True)
    type = models.CharField(max_length=50, default="default")  # Add this line

    def __str__(self):
        return self.name

class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True)
    section = models.ForeignKey(MenuSection, on_delete=models.CASCADE, related_name='items', null=True)

    def __str__(self):
        return self.name

class Note(models.Model):
    section = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.section

class MenuHeader(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title
