'use client';
import PlusButton from '@/components/(buttons)/PlusButton';
import Dropdown, { DropdownSizes } from '@/components/Dropdown/page';
import Dropzone from '@/components/Dropzone/page';
import Input, { InputTypes } from '@/components/Input/page';
import Textbox, { FontSizes } from '@/components/Textbox/page';
import { useTranslations } from 'next-intl';

const CreateRecipe: React.FC = () => {
  const t = useTranslations('createRecipe');
  return (
    <section className='flex h-full w-full flex-row'>
      <section className='flex h-full w-full basis-1/2 flex-col gap-3 border-l-2 pr-3 pt-4'>
        <p className='pr-4 text-5xl font-bold'>{t('createRecipe')}</p>
        <section className='w-4/5 rounded-2xl bg-white px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {t('addRecipeName')}
          </p>
          <Input
            type={InputTypes.TEXT}
            value={undefined}
            onChange={(e) => console.log(e)}
          />
        </section>

        <section className='h-fit w-4/5 rounded-2xl bg-white px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {t('addRecipeDescription')}
          </p>
          <Textbox
            isEditMode={false}
            fontSizeProps={FontSizes.MEDIUM}
            value={undefined}
            onChange={(text: string) => {}}
          />
        </section>

        <section className='h-fit w-4/5 rounded-2xl bg-white px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {t('uploadRecipePictue')}
          </p>
          <Dropzone onFilesChanged={(files: File[]) => {}} />
        </section>
      </section>
      <section className='h-full w-full basis-1/2 pr-3 pt-4'>
        <section className='relative h-fit w-4/5 rounded-2xl bg-white px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {t('addRecipeIngredients')}
          </p>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {t('sectionName')}
          </p>
          <Dropdown
            isSearchable={true}
            placeholder={'Mizrachim'}
            items={[]}
            onChange={() => {}}
            size={DropdownSizes.SMALL}
          />
          <Dropdown
            isSearchable={true}
            placeholder={'Units'}
            items={[]}
            onChange={() => {}}
            size={DropdownSizes.SMALL}
          />
          quantity
          <Input
            type={InputTypes.NUMBER}
            value={undefined}
            onChange={() => {}}
          />
          <PlusButton
            onClick={() => {}}
            className='absolute -bottom-6 left-1/2 -translate-x-1/2 transform'
          />
        </section>
      </section>
    </section>
  );
};

export default CreateRecipe;
