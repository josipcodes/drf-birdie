# Generated by Django 3.2.24 on 2024-02-29 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=100)),
                ('internal_notes', models.TextField(max_length=300)),
            ],
            options={
                'ordering': ['-company_name'],
            },
        ),
    ]
